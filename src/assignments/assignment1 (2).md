# Build CRUD for a Author-resource

## Intro

In Block 1, we'be been building a CRUD for Book. Now we'll be doing the same thing for a brand new resource: Author. It will be in practically the same process as when we made our project, and you may wanna use our Book module as a references point, just remember **write the code, do not copy + paste**. May sound silly, but it has proven effect to help with understanding the process.

## Requirements

1. Create `src/models/Author.ts` with a `Mongoose-schema` that have atleast the minimum required number of fields:

- `name` as a mandatory `string`
- `nationallity` as `string`
- `birthYear` as a `number`
- `isActive` as a `bolean` default `true`
- use `timestamps`

2. Create `src/routes/authors.js` with a `route` that `exports` five endpoints

- `POST /`
- `GET /`
- `GET /:id`
- `PATCH /:id`
- `DELETE /:id`

3. Use `Model.create()` for `POST` and `return` `201` if successful, `400` if `ValidationError` is triggered.

4. Use `findById()` for `GET /id` and `return` `404` both when the document doesn't exist and when `id` is in the wrong format (`CastError`).

5. Use `findByIdAndUpdate()` with options `{returnDocument: 'after', runValidations: true}` for `PATCH /:id`.

6. Use `findByIdAndDelete()` for `DELETE /:id` and return `204` on success.

7. Register the `author-route` in `app.js` on the route `/api/v1/authors` to amke sure the entire API works end-to-end

8. Verify in Thunder Client or Postman that all five endpoints are working. Crerate a minimum 2 `authors`, list them, update one, delete one.
