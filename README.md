# OpenAI 

## Setup

1. Install

   ```bash
   $ npm install
   ```

2. Run the app

   ```bash
   $ npm run dev
   ```

3. Deploy

   ```bash
   docker build . -t natanaela/openai-node
   docker run -p 8080:3000 -d natanaela/openai-node
   ```