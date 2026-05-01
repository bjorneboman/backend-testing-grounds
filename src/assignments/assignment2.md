# Add a Genre resource and tie it to Book

## Intro

A book normaly have one or more genres (fantasy, detective, sci-fi, etc.). For this assignment you'll be building a Genre functionallity to the app. HOWEVER - you'll have to decide for yourselves if Genre shall be modeled into a embeded subdocument or as a seperate collection with ObjectId-references. Both options are valid.

## Requirments:

1. Deside if embedding or referencing should be used and add a short motivation (2-3 sentences) in a commment in the top of the file you create/edits. This is the most important part, **think** then **act**.

2. Implment your choice.

- **Using embedding**: extend Book Schema so that a book may have a `genre` field as an array of strings or subdocuments.
- **Using Referencing**: Create `src/models/Genre.js` with its own `Schema` and update `Book` to make sure `author` get a buddy in the form of a genres-array of the type `ObjectId` reference with `ref: 'Genre'`.

3. Create atleast one endpoint (POST or PATCH) that allows you to connect genre to a book. **Using referince**: don\t forget to `populate` so that the response contains readble genre data.

4. Create at least 2 books with different genres through ThunderClient or Postman and show that `populate` (if refrencing) or `embeded` data (if emebedding) is present in the response.
