require("dotenv").config();
const App = require("./app");
const initDB = require("./db/index");
const port = process.env.PORT;
// const uri = process.env.DATABASE_URI;
const api = new App(port);
const db = new initDB(process.env.DATABASE_URI);

api.app.get("/", (req, res) => {
  res.send("hello world ! ");
});

api.app.get("/query/:query", async (req, res) => {
  const queryUrl = req.params.query;

  try {
    const searchTearm = [
      "MATCH (artist:Artist)-[:PERFORMS]->(track:Track)-[:FROM_ALBUM]->(album:Album)",
      `WHERE artist.name = ~'${queryUrl}*'`,
      "RETURN artist,album,track",
    ].join("\n");
    const result =
      await db.run(`MATCH (snoop:Artist)-[:PERFORMS]->(snoopTrack:Track)-[:FROM_ALBUM]->(album:Album)
                    WHERE snoop.name =~ '${queryUrl} .*'
                    WITH snoopTrack
                    MATCH (featuringArtist:Artist)-[:PERFORMS]->(featuringTrack:Track)-[:FROM_ALBUM]->(featuringAlbum:Album)
                    WHERE (featuringTrack)<-[:PERFORMS]-() AND featuringTrack = snoopTrack
                    WITH featuringArtist
                    MATCH (featuringArtist)-[:PERFORMS]->(allTracks:Track)
                    RETURN featuringArtist, collect(allTracks)as tracks;`);
    // const singleRecord = result.records[0];
    // const node = singleRecord.get(0);
    // console.log(result.records[0]);
    // result.records.forEach((record) => {
    //   console.log(record._fields);
    // });

    return res.status(200).json({ data: result.records });
  } catch (error) {
    console.log(" error", error);
    return res.status(403).json({ error: ` no result found for ${queryUrl}` });
  } finally {
    await db.close();
  }
});
