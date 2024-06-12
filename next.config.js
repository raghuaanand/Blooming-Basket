/** @type {import('next').NextConfig} */
require('dotenv').config

const nextConfig = {
    env:{
        MONGO_URI : process.env.MONGO_URI,
        SECRET_KEY:process.env.SECRET_KEY,
        JWT_EXPIRE : process.env.JWT_EXPIRE
    },
}

module.exports = nextConfig
