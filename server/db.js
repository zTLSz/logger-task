// ------------------------------------
// DB
// ------------------------------------
 function makedb(mongoose) {
    const Schema = mongoose.Schema;

    const NoteSchema = new Schema({
        name: { type: String },
        text: { type: String },
        date: { type: String },
        dateMs: { type: Number },
        number: { type: Number },
        rate: { type: Number },
        isThread: { type: Boolean },
        threadPosts:  [Schema.Types.Mixed]
    });

    // model for posts amount
    const AmountSchema = new Schema({
        amount: { type: Number },
    });

    mongoose.model('Note', NoteSchema);
    mongoose.model('Amount', AmountSchema)

  }

module.exports.makedb = makedb;