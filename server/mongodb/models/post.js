import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
    category: {type: String, required: false},
    color: {type: String, required: false},
    style: {type: String, required: false}
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
