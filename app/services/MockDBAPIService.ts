import axios from "axios";

interface CharacterSchema {
    id: string
    name: string
    displayName: string
    details: string
    personality: string
}

interface UserPersonaSchema {
    id: string
    name: string
    details: string
}

interface ScenarioSchema {
    id: string
    name: string
    related_character_id: string
    content: string
}

interface SystemMessageSchema {
    id: string
    name: string
    related_character_id: string
    content: string
}

interface UserSchema {
    id: string
    name: string
    password: string
}

export class MockDBAPIService {
    getHost() {
        return "http://localhost:3000"
    }

    async login(name: string, password: string) {
        const user = await this.getUserByName(name)
        if (!user[0]) {
            throw new Error("No user found with that name")
        }

        if (password != user[0].password) {
            throw new Error("Password's dont match")
        }

        return user[0]
    }

    async getCharacters() {
        const uri = 'characters'
        const url = `${this.getHost()}/${uri}`
        const charactersResponse = await axios.get<Array<CharacterSchema>>(url)

        return charactersResponse.data
    }

    async getUserPersonas() {
        const uri = 'user_personas'
        const url = `${this.getHost()}/${uri}`
        const charactersResponse = await axios.get<Array<UserPersonaSchema>>(url)

        return charactersResponse.data
    }

    async getScenarios() {
        const uri = 'scenarios'
        const url = `${this.getHost()}/${uri}`
        const charactersResponse = await axios.get<Array<ScenarioSchema>>(url)

        return charactersResponse.data
    }

    async getSystemMessages() {
        const uri = 'system_messages'
        const url = `${this.getHost()}/${uri}`
        const charactersResponse = await axios.get<Array<SystemMessageSchema>>(url)

        return charactersResponse.data
    }

    async getUserByName(name: string) {
        const uri = 'users'
        const url = `${this.getHost()}/${uri}?name=${name}`
        console.log(url)
        const charactersResponse = await axios.get<Array<UserSchema>>(url)

        return charactersResponse.data
    }

    async getSystemMessage(id: string) {
        const uri = 'system_messages'
        const url = `${this.getHost()}/${uri}/${id}`
        const charactersResponse = await axios.get<SystemMessageSchema>(url)

        return charactersResponse.data
    }

    async getCharacter(id: string) {
        const uri = 'characters'
        const url = `${this.getHost()}/${uri}/${id}`
        const charactersResponse = await axios.get<CharacterSchema>(url)

        return charactersResponse.data
    }

    async getScenario(id: string) {
        const uri = 'scenarios'
        const url = `${this.getHost()}/${uri}/${id}`
        const charactersResponse = await axios.get<ScenarioSchema>(url)

        return charactersResponse.data
    }
}

export const mockDBAPIService = new MockDBAPIService()