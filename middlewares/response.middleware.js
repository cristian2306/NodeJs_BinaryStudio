const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const { data, err } = res
  console.log('se supone que entro')
  console.log({ data }, { err })
  if (data) {
    res.status(200).send(data)
  } else if (err) {
    const { codeStatus, message } = err
    res.status(codeStatus).send({ error: true, message })
  }
  next();
};

export { responseMiddleware };
