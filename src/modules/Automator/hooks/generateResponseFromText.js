import { useState } from 'react'
import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true})

export function useGenerateResponseFromText() {
    const [isLoadingText, setIsLoadingText] = useState(false)

    async function generateResponseFromText(prompt) {
        setIsLoadingText(true)

        return openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `
                        lo que tiene que hacer...
                    `
                },
                {
                    role: "user",
                    content: prompt
                }
            ]


        }).then( response => {
            setIsLoadingText(false)
            const json = JSON.parse(response.choices[0].message.content)
            console.log(json)
            return json
        }).catch( error => {
            console.log("Error al emitir el texto desde GPT: ", error)
            throw error
        })
    }

    return [isLoadingText, generateResponseFromText]
}