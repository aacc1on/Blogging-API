# 1. Base image
FROM node:20-alpine

# 2. App directory
WORKDIR /app

# 3. Dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the code
COPY . .

# 5. Env
ENV NODE_ENV=production

# 6. Expose port
EXPOSE 3000

# 7. Start command
CMD ["node", "index.js"]
