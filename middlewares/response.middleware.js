const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const { data, err } = res
  console.log('se supone que entro')
  console.log({ data }, { err })
  if (data) {
    res.status(200).send(data).end()
  } else if (err) {
    const { statusCode, message } = err
    res.status(statusCode).send({ error: true, message }).end()
  }
};

export { responseMiddleware };
