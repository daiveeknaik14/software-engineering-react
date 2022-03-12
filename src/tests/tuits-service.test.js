import {
  createTuit,
  findAllTuits, findTuitByUser,
  findTuitById, deleteTuit, updateTuit
} from "../services/tuits-service";
import {
  deleteUsersByUsername, createUser
} from "../services/users-service"; 

const user = {
  username: 'demo',
  password: 'demo123',
  email: 'demo@demo.com'
}

describe('can create tuit with REST API', () => {
  // TODO: implement this
  const tuitPosted = {
    _id: '622c61d914524da83bccae44',
    tuit: 'This is a demo tuit to be deleted in the future, do not keep it haha',
    postedOn: '03/13/2022'
  };

  beforeAll(async () => {
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteTuit(tuitPosted._id);
    return deleteUsersByUsername(user.username);
  })

  test('can insert new tuits with REST API', async () => {
    const userCreated = await createUser(user);
    const tuitCreated = await createTuit(userCreated._id, tuitPosted);
    expect(tuitCreated.tuit).toEqual(tuitPosted.tuit);
  });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
  const tuitPosted = {
    _id: '622c61d914524da83bccae44',
    tuit: 'This is a demo tuit to be deleted in the future, do not keep it haha',
    postedOn: '03/13/2022'
  };

  beforeAll(async () => {
    await deleteTuit(tuitPosted._id);
    await deleteUsersByUsername(user.username);
  });

  afterAll(async () => {
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });

  test('can delete tuit with REST API', async () => {
    const userCreated = await createUser(user);
    await createTuit(userCreated._id, tuitPosted);
    const status = await deleteTuit(tuitPosted._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
  const tuitPosted = {
    _id: '622c61d914524da83bccae44',
    tuit: 'This is a demo tuit to be deleted in the future, do not keep it haha',
    postedOn: '03/13/2022'
  };

  beforeAll(async () => {
    // remove user and tuit to delete in test
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuitPosted._id);
    return await deleteUsersByUsername(user.username);
  });

  test('can retrieve a tuit by id with REST API', async () => {
    const userCreated = await createUser(user);
    await createTuit(userCreated._id, tuitPosted);
    const retrievedTuit = await findTuitById(tuitPosted._id);
    expect(retrievedTuit.tuit).toEqual(tuitPosted.tuit);
    expect(retrievedTuit.postedBy).toEqual(userCreated);
  });
});

describe('can retrieve all tuits with REST API', () => {
  const tuitPosted = [
    {
    _id: '622c61d914524da83bccae44',
    tuit: 'This is a demo tuit to be deleted in the future, do not keep it haha',
    postedOn: '03/13/2022'
    },
    {
      _id: '622c61d914524da83bccae45',
      tuit: 'This is a demo tuit to be deleted in the future, do not keep it haha',
      postedOn: '03/13/2022'
    },
    {
      _id: '622c61d914524da83bccae46',
      tuit: 'This is the last demo tuit and will too be deleted.',
      postedOn: '05/13.2022'
    }
  ];

  beforeAll(async () => {
    // remove user and tuits to delete in test
    Promise.all(tuitPosted.map(async (tuit) => await deleteTuit(tuit._id)));
    return deleteUsersByUsername(user.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    Promise.all(tuitPosted.map(async (tuit) => await deleteTuit(tuit._id)));
    return deleteUsersByUsername(user.username);
  });

  test('can retrieve all tuits with REST API', async () => {
    const userCreated = await createUser(user);
    await Promise.all(tuitPosted.map(async (tuit) => {
      return await createTuit(userCreated._id, tuit);
    }));

    const retrievedTuits = await findAllTuits();
    expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuitPosted.length);
    const tuitsWeInserted = retrievedTuits.filter(
      tuit => tuit.postedBy._id === userCreated._id);

    tuitsWeInserted.forEach(tuitInserted => {
      const tuit = tuitPosted.find(tuit => tuit._id === tuitInserted._id);
      expect(tuitInserted.tuit).toEqual(tuit.tuit);
      expect(tuitInserted.postedBy).toEqual(userCreated);
    });
  });
});