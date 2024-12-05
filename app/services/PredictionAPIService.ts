import axios from "axios";

interface LlamaMessage {
    role: string
    content: string
}

interface LlamaPredictBody {
    model_variant: 'LARGE_NEW_INSTRUCT' | 'MEDIUM_INSTRUCT' | 'MEDIUM'
    char: string
    user: string
    messages: Array<LlamaMessage>
    system_message: string | null
    char_details: string | null
    char_personality: string | null
    scenario: string | null
}

interface LlamaPredictResponse {
    generated_prompt: string
    prediction: string
}


class PredictionApiService {
    getHost() {
        return "http://localhost:3666"
    }

    async llamaPredict(body: LlamaPredictBody) {
        const uri = 'predict/replicate/llama'
        const url = `${this.getHost()}/${uri}`
        const response = await axios.post<LlamaPredictResponse>(url, body)

        return response.data
    }
}

export const predictionApiService = new PredictionApiService()