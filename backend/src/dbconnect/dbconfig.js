import mongoose from 'mongoose';

export const dbConnect =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected successfully');
        
    } catch (error) {
        console.error(`error connecting to mongo db ${error.message}`);
        process.exit(1);
    }
}