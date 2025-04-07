FROM node:18-alpine
WORKDIR /TechSprint

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
