import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Acción asíncrona para obtener datos de Swagger
export const fetchSwaggerData = createAsyncThunk(
    'automator/fetchSwaggerData',
    async (swaggerUrl, thunkAPI) => {
        const response = await fetch(swaggerUrl)
        const swaggerData = await response.json()
        const extractedEndpoints = []
        
        // Pongo el ApiServerUrl que venga en el swagger y no la url origen del fichero
        if (swaggerData.servers && swaggerData.servers.length > 0) {
            const serverUrl = swaggerData.servers[0].url; 
            thunkAPI.dispatch(setApiServerUrl(serverUrl)); 
        }

        const extractSchema = (schema, swaggerData) => {
            if (schema.$ref) {
                const ref = schema.$ref.replace('#/components/schemas/', '')
                return { ...swaggerData.components.schemas[ref], name: ref }
            } else if (schema.type === 'array' && schema.items) {
                return { type: 'array', items: extractSchema(schema.items, swaggerData) }
            } else if (schema.type === 'object' && schema.properties) {
                const properties = {}
                Object.entries(schema.properties).forEach(([key, subSchema]) => {
                    properties[key] = extractSchema(subSchema, swaggerData)
                })
                return { type: 'object', properties }
            }
            return schema
        }

        Object.keys(swaggerData.paths).forEach((path) => {
            Object.keys(swaggerData.paths[path]).forEach((method) => {
                const endpoint = {
                    method: method.toUpperCase(),
                    url: path,
                    schemas: [],
                }

                const responses = swaggerData.paths[path][method].responses
                Object.keys(responses).forEach((statusCode) => {
                    const content = responses[statusCode].content
                    if (content) {
                        Object.keys(content).forEach((contentType) => {
                            const schema = content[contentType].schema
                            if (schema) {
                                endpoint.schemas.push(extractSchema(schema, swaggerData))
                            }
                        })
                    }
                })

                extractedEndpoints.push(endpoint)
            })
        })

        return extractedEndpoints
    }
)

const initialState = {
    endPoints: [],
    apiServerUrl: null,
    loading: false,
    error: null,
}

const automatorSlice = createSlice({
    name: 'automator',
    initialState: initialState,
    reducers: {
        setEndPoints: (state, action) => {
            state.endPoints = action.payload
        },
        setApiServerUrl: (state, action) => {
            state.apiServerUrl = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSwaggerData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSwaggerData.fulfilled, (state, action) => {
                state.loading = false
                state.endPoints = action.payload
            })
            .addCase(fetchSwaggerData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { setEndPoints, setApiServerUrl } = automatorSlice.actions

export default automatorSlice.reducer