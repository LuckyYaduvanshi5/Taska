# ✅ Sahi Dockerfile
FROM node:18

WORKDIR /app

COPY . .

# 🛠 Dependencies Install Karne Ka Step (Ye missing tha)
RUN npm install --force

CMD ["npx", "expo", "start", "--tunnel"]
