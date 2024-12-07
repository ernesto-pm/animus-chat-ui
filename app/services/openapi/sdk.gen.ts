// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from '@hey-api/client-axios';
import type { LoginUsersLoginPostData, LoginUsersLoginPostError, LoginUsersLoginPostResponse, SignupNormieUserUsersSignupNormiePostData, SignupNormieUserUsersSignupNormiePostError, SignupNormieUserUsersSignupNormiePostResponse, SignupAdminUserUsersSignupAdminPostData, SignupAdminUserUsersSignupAdminPostError, SignupAdminUserUsersSignupAdminPostResponse, GetAllUsersUsersGetError, GetAllUsersUsersGetResponse, GetUserByEmailUsersEmailEmailGetData, GetUserByEmailUsersEmailEmailGetError, GetUserByEmailUsersEmailEmailGetResponse, GetUserByIdUsersEmailIdGetData, GetUserByIdUsersEmailIdGetError, GetUserByIdUsersEmailIdGetResponse, CreatePersonaPersonasPostData, CreatePersonaPersonasPostError, CreatePersonaPersonasPostResponse, GetPersonasForUserPersonasForUserUserIdGetData, GetPersonasForUserPersonasForUserUserIdGetError, GetPersonasForUserPersonasForUserUserIdGetResponse, GetPublicSystemMessagesSystemMessagesPublicGetError, GetPublicSystemMessagesSystemMessagesPublicGetResponse, GetPublicMessagesForUserSystemMessagesForUserUserIdGetData, GetPublicMessagesForUserSystemMessagesForUserUserIdGetError, GetPublicMessagesForUserSystemMessagesForUserUserIdGetResponse, CreateSystemMessageSystemMessagesPostData, CreateSystemMessageSystemMessagesPostError, CreateSystemMessageSystemMessagesPostResponse, CreateCharacterCharactersPostData, CreateCharacterCharactersPostError, CreateCharacterCharactersPostResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Login
 */
export const loginUsersLoginPost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<LoginUsersLoginPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<LoginUsersLoginPostResponse, LoginUsersLoginPostError, ThrowOnError>({
        ...options,
        url: '/users/login'
    });
};

/**
 * Signup Normie User
 */
export const signupNormieUserUsersSignupNormiePost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SignupNormieUserUsersSignupNormiePostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SignupNormieUserUsersSignupNormiePostResponse, SignupNormieUserUsersSignupNormiePostError, ThrowOnError>({
        ...options,
        url: '/users/signup/normie'
    });
};

/**
 * Signup Admin User
 */
export const signupAdminUserUsersSignupAdminPost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<SignupAdminUserUsersSignupAdminPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SignupAdminUserUsersSignupAdminPostResponse, SignupAdminUserUsersSignupAdminPostError, ThrowOnError>({
        ...options,
        url: '/users/signup/admin'
    });
};

/**
 * Get All Users
 */
export const getAllUsersUsersGet = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllUsersUsersGetResponse, GetAllUsersUsersGetError, ThrowOnError>({
        ...options,
        url: '/users/'
    });
};

/**
 * Get User By Email
 */
export const getUserByEmailUsersEmailEmailGet = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetUserByEmailUsersEmailEmailGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetUserByEmailUsersEmailEmailGetResponse, GetUserByEmailUsersEmailEmailGetError, ThrowOnError>({
        ...options,
        url: '/users/email/{email}'
    });
};

/**
 * Get User By Id
 */
export const getUserByIdUsersEmailIdGet = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetUserByIdUsersEmailIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetUserByIdUsersEmailIdGetResponse, GetUserByIdUsersEmailIdGetError, ThrowOnError>({
        ...options,
        url: '/users/email/{id}'
    });
};

/**
 * Create Persona
 */
export const createPersonaPersonasPost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreatePersonaPersonasPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreatePersonaPersonasPostResponse, CreatePersonaPersonasPostError, ThrowOnError>({
        ...options,
        url: '/personas/'
    });
};

/**
 * Get Personas For User
 */
export const getPersonasForUserPersonasForUserUserIdGet = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPersonasForUserPersonasForUserUserIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPersonasForUserPersonasForUserUserIdGetResponse, GetPersonasForUserPersonasForUserUserIdGetError, ThrowOnError>({
        ...options,
        url: '/personas/for-user/{user_id}'
    });
};

/**
 * Get Public System Messages
 */
export const getPublicSystemMessagesSystemMessagesPublicGet = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPublicSystemMessagesSystemMessagesPublicGetResponse, GetPublicSystemMessagesSystemMessagesPublicGetError, ThrowOnError>({
        ...options,
        url: '/system-messages/public'
    });
};

/**
 * Get Public Messages For User
 */
export const getPublicMessagesForUserSystemMessagesForUserUserIdGet = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPublicMessagesForUserSystemMessagesForUserUserIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPublicMessagesForUserSystemMessagesForUserUserIdGetResponse, GetPublicMessagesForUserSystemMessagesForUserUserIdGetError, ThrowOnError>({
        ...options,
        url: '/system-messages/for-user/{user_id}'
    });
};

/**
 * Create System Message
 */
export const createSystemMessageSystemMessagesPost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateSystemMessageSystemMessagesPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateSystemMessageSystemMessagesPostResponse, CreateSystemMessageSystemMessagesPostError, ThrowOnError>({
        ...options,
        url: '/system-messages/'
    });
};

/**
 * Create Character
 */
export const createCharacterCharactersPost = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateCharacterCharactersPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateCharacterCharactersPostResponse, CreateCharacterCharactersPostError, ThrowOnError>({
        ...options,
        url: '/characters/'
    });
};