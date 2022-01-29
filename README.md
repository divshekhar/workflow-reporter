# workflow-reporter

> A GitHub App built with [Probot](https://github.com/probot/probot) that A GitHub app to report failed workflow job actions and custom report message for the job.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t workflow-reporter .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> workflow-reporter
```

## Contributing

If you have suggestions for how workflow-reporter could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Divyanshu Shekhar <imdshekhar@gmail.com>
