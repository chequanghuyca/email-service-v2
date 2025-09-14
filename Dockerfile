# Use the official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1 as production
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy built application
COPY --from=base /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Run the app
USER bun
CMD ["bun", "run", "dist/main.js"]
