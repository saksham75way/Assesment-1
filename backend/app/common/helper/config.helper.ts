import dotenv from "dotenv";
import process from "process";
import path from "path";
import winston from "winston";

// Setup Logger
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }), // Save logs to a file
  ],
});

// Load Environment Variables
export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";
  const filepath = path.join(process.cwd(), `.env.${env}`);

  const result = dotenv.config({ path: filepath });

  if (result.error) {
    logger.error(`Failed to load environment file: ${filepath}`);
  } else {
    logger.info(`Environment file loaded: ${filepath}`);
  }
};
