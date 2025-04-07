FROM node:18-alpine
WORKDIR /TechSprint

COPY .. /TechSprint

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
