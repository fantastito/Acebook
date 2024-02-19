const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user');
const Post = require('../models/post');

mongoose.connect('mongodb://0.0.0.0/acebook', { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {

    // Empty database
    await User.deleteMany({});
    await Post.deleteMany({});

    // List of users
    const users = [ 
        { username: 'Alice', email: 'alice@example.com', password: 'Passw0rd!A', image: 'alice.jpg', bio: 'Aloha after an awesome athletic afternoon' },
        { username: 'Bob', email: 'bob@example.com', password: 'Passw0rd!B', image: 'bob.jpg', bio: 'Better bean breakfasts bouncing before bathtime.' },
        { username: 'Claire', email: 'claire@example.com', password: 'Passw0rd!C', image: 'claire.jpg', bio: 'Creatively coding Claire.' },
        { username: 'David', email: 'david@example.com', password: 'Passw0rd!D', image: 'david.jpg', bio: 'Dastardly dashing David' },
        { username: 'Eugene', email: 'eugene@example.com', password: 'Passw0rd!E', image: 'eugene.jpg', bio: 'Eventful evenings eating eucalyptus.' }       
    ];

    // Password hashing
    function hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    };

    // Add users to database
    for (const userData of users) {

        const hashedPassword = hashPassword(userData.password);
        
        userData.password = hashedPassword;
        
        const user = new User(userData);
        await user.save();
    }

    // Set up friend relationships
    const addedUsers = await User.find({});

    addedUsers[0].friends.push(addedUsers[1]._id, addedUsers[2]._id, addedUsers[3]._id, addedUsers[4]._id);
    addedUsers[1].friends.push(addedUsers[0]._id, addedUsers[2]._id, addedUsers[3]._id);
    addedUsers[2].friends.push(addedUsers[0]._id, addedUsers[1]._id);
    addedUsers[3].friends.push(addedUsers[0]._id, addedUsers[1]._id);
    addedUsers[4].friends.push(addedUsers[0]._id);

    await Promise.all(addedUsers.map(user => user.save()));

    // Set posts

    const posts = [
        {
            message: 'Who is your favourite character from the Office US?',
            likes: [`${addedUsers[2]._id}`, `${addedUsers[3]._id}`, `${addedUsers[4]._id}`], 
            media: null,
            postedBy: addedUsers[0]._id,
            comments: [
                { message: 'Obviously it has to be Jim', user: addedUsers[1]._id },
                { message: 'Dwight all the way', user: addedUsers[2]._id },
                { message: 'CREED!!!', user: addedUsers[4]._id }
            ],
        },

        {
            message: 'Who wants to go the beach today?',
            media: null,
            likes: [`${addedUsers[0]._id}`, `${addedUsers[4]._id}`, `${addedUsers[2]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[1]._id,
            comments: [
                { message: "I'd love to go but I'm busy", user: addedUsers[0]._id },
                { message: 'Sure thing, what time were you thinking?', user: addedUsers[4]._id },
                { message: 'How about 11??', user: addedUsers[1]._id },
                { message: 'Great, see you there 👍', user: addedUsers[4]._id },
            ],
        },

        {
            message: "Just whipped up some hot, heavenly, fluffy pancakes for brunch.",
            media: 'pancakes.jpg',
            likes: [`${addedUsers[1]._id}`, `${addedUsers[4]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[2]._id,
            comments: [
                { message: '#pancakeslife', user: addedUsers[1]._id },
                { message: 'Not for me! Crêpes all the way', user: addedUsers[0]._id },
                { message: 'Count me in 😋', user: addedUsers[3]._id }
            ],
        },

        {
            message: 'Just had the most peaceful day by the lake, fishing rod in hand and surrounded by #nature',
            media: 'fishing.jpeg',
            likes: [`${addedUsers[2]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[3]._id,
            comments: [
                { message: 'What did you catch?', user: addedUsers[0]._id },
                { message: '#fishinglife!!!!', user: addedUsers[4]._id },
            ],
        },

        {
            message: "OMG! Jumped out of a plane today,what a thrill! There's no adrenaline rush like freefalling. Living life on the edge! #SkydivingAdventure",
            media: 'sky-diver.avif',
            likes: [`${addedUsers[2]._id}`, `${addedUsers[3]._id}`, `${addedUsers[1]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[4]._id,
            comments: [
                { message: "There's no way I could do that", user: addedUsers[0]._id },
                { message: 'Join the club!', user: addedUsers[2]._id },
                { message: 'When are you going again?', user: addedUsers[3]._id }
            ],
        }
    ];

    // Associate posts with users
    const seededPosts = await Post.insertMany(posts);

    // Update the user's posts
    for (const post of seededPosts) {
        const user = addedUsers.find(u => u._id.equals(post.postedBy));
        user.posts.push(post._id);
        await user.save();
    }

    // End process
    console.log('Database seeded successfully');
};

module.exports = seedDatabase;

// Images list:
// Chad Montano (@briewilly) on Unsplash https://unsplash.com/photos/baked-pancakes-eeqbbemH9-c
// Jurica Koletić (@juricakoletic) on Unsplash https://unsplash.com/photos/man-wearing-henley-top-portrait-7YVZYZeITc8
// Ben den Engelsen (@benjeeeman) on Unsplash https://unsplash.com/photos/man-in-black-jacket-and-brown-cap-YUu9UAcOKZ4
// Vince Veras (@vinceveras) on Unsplash https://unsplash.com/photos/woman-in-black-and-white-striped-shirt-AJIqZDAUD7A
// Ayo Ogunseinde (@armedshutter) on Unsplash https://unsplash.com/photos/black-haired-man-making-face-sibVwORYqs0
// Christopher Campbell (@chrisjoelcampbell) on Unsplash https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs
