# Base image
FROM node:22-slim
RUN apt update && apt install -y openssl

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install && npx prisma migrate deploy

# Expose the port on which the app will run
EXPOSE 3333

# Start the server using the production build
CMD ["npm", "run", "start"]