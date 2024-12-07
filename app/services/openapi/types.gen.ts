// This file is auto-generated by @hey-api/openapi-ts

export type AnimusBetaPersona = {
    id: string;
    name: string;
    details: (string | null);
    associated_user_id: string;
    is_public: (boolean | null);
};

export type AnimusBetaSystemMessage = {
    id: string;
    name: string;
    content: (string | null);
    is_public: (boolean | null);
    associated_user_id: string;
};

export type AnimusBetaUser = {
    id: string;
    name: (string | null);
    username: (string | null);
    email: string;
    email_verified: (string | null);
    password: (string | null);
    created_at: string;
    updated_at: (string | null);
    is_admin: boolean;
};

export type CreateCharacterParams = {
    name: string;
    display_name: string;
    details: string;
    associated_user_id: (string | null);
    is_public: (boolean | null);
    additional_attributes: (unknown | null);
};

export type CreatePersonasBody = {
    name: string;
    details: (string | null);
    associatedUserId: string;
    isPublic: boolean;
};

export type CreateSystemMessageBody = {
    name: string;
    content: string;
    associatedUserId: (string | null);
    isPublic: boolean;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type LoginBody = {
    email: string;
    password: string;
};

export type SignupUser = {
    name: string;
    username: string;
    email: string;
    plainTextPassword: string;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type LoginUsersLoginPostData = {
    body: LoginBody;
};

export type LoginUsersLoginPostResponse = (AnimusBetaUser);

export type LoginUsersLoginPostError = (HTTPValidationError);

export type SignupNormieUserUsersSignupNormiePostData = {
    body: SignupUser;
};

export type SignupNormieUserUsersSignupNormiePostResponse = (AnimusBetaUser);

export type SignupNormieUserUsersSignupNormiePostError = (HTTPValidationError);

export type SignupAdminUserUsersSignupAdminPostData = {
    body: SignupUser;
};

export type SignupAdminUserUsersSignupAdminPostResponse = (AnimusBetaUser);

export type SignupAdminUserUsersSignupAdminPostError = (HTTPValidationError);

export type GetAllUsersUsersGetResponse = (Array<AnimusBetaUser>);

export type GetAllUsersUsersGetError = unknown;

export type GetUserByEmailUsersEmailEmailGetData = {
    path: {
        email: string;
    };
};

export type GetUserByEmailUsersEmailEmailGetResponse = ((AnimusBetaUser | null));

export type GetUserByEmailUsersEmailEmailGetError = (HTTPValidationError);

export type GetUserByIdUsersEmailIdGetData = {
    path: {
        id: string;
    };
};

export type GetUserByIdUsersEmailIdGetResponse = ((AnimusBetaUser | null));

export type GetUserByIdUsersEmailIdGetError = (HTTPValidationError);

export type CreatePersonaPersonasPostData = {
    body: CreatePersonasBody;
};

export type CreatePersonaPersonasPostResponse = (AnimusBetaPersona);

export type CreatePersonaPersonasPostError = (HTTPValidationError);

export type GetPersonasForUserPersonasForUserUserIdGetData = {
    path: {
        user_id: string;
    };
};

export type GetPersonasForUserPersonasForUserUserIdGetResponse = (Array<AnimusBetaPersona>);

export type GetPersonasForUserPersonasForUserUserIdGetError = (HTTPValidationError);

export type GetPublicSystemMessagesSystemMessagesPublicGetResponse = (Array<AnimusBetaSystemMessage>);

export type GetPublicSystemMessagesSystemMessagesPublicGetError = unknown;

export type GetPublicMessagesForUserSystemMessagesForUserUserIdGetData = {
    path: {
        user_id: string;
    };
};

export type GetPublicMessagesForUserSystemMessagesForUserUserIdGetResponse = (Array<AnimusBetaSystemMessage>);

export type GetPublicMessagesForUserSystemMessagesForUserUserIdGetError = (HTTPValidationError);

export type CreateSystemMessageSystemMessagesPostData = {
    body: CreateSystemMessageBody;
};

export type CreateSystemMessageSystemMessagesPostResponse = (AnimusBetaSystemMessage);

export type CreateSystemMessageSystemMessagesPostError = (HTTPValidationError);

export type CreateCharacterCharactersPostData = {
    body: CreateCharacterParams;
};

export type CreateCharacterCharactersPostResponse = (AnimusBetaPersona);

export type CreateCharacterCharactersPostError = (HTTPValidationError);