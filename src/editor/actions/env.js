export const SWITCH_ENV = 'SWITCH_ENVIRONMENT';

export const switch_env = (env = process.env.NODE_ENV) => ({
    type: SWITCH_ENV,
    env,
});