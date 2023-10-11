import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, dataStorage } from "./firebase/config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  // update movie state
  const [updateMovieTitle, setUpdateMovieTitle] = useState("");
  // file upload state
  const [fileUpload, setFileUpload] = useState(null);

  // reference
  const movieCollectionRef = collection(db, "movies");
  // get movie list
  const getMovieList = async () => {
    // Read data from database
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  // submit movie
  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      console.log("added successfully");
      setNewMovieTitle("");
      setNewReleaseDate(0);
      setIsNewMovieOscar(false);
      getMovieList();
    } catch (err) {
      console.error(err.message);
    }
  };
  // delete Movie
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      console.log("Deleted Successfully");
      getMovieList();
    } catch (err) {
      console.error(err.message);
    }
  };
  // update Movie
  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updateMovieTitle });
      setUpdateMovieTitle("");
      getMovieList();
      console.log("updated successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  // storage firebase
  const uploadFileFunc = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(dataStorage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center font-mono gap-5">
      <h1 className="text-4xl font-semibold">Firebase Tutorials</h1>
      <Auth />
      <div className="flex justify-start items-center gap-4">
        <input
          type="text"
          placeholder="movie title..."
          className="border border-black text-lg font-medium p-1"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="release date..."
          className="border border-black text-lg font-medium p-1"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <div className="flex gap-4">
          <label htmlFor="checkbox">Received an oscar</label>
          <input
            type="checkbox"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
        </div>
        <button
          className="bg-black text-white px-3 py-1 cursor-pointer"
          onClick={() => onSubmitMovie()}
        >
          Submit Movie
        </button>
      </div>
      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id} className="text-center mb-4">
              <h1
                className={`text-3xl font-semibold ${
                  movie.receivedOscar ? "text-green-500" : "text-red-500"
                }`}
              >
                {movie.title}
              </h1>
              <p className="text-lg font-medium">Date: {movie.releaseDate}</p>
              <button
                className="bg-black text-white px-3 py-1 cursor-pointer"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
              <input
                type="text"
                placeholder="new title..."
                className="border border-black text-lg font-medium p-1 mx-4"
                onChange={(e) => setUpdateMovieTitle(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-3 py-1 cursor-pointer"
                onClick={() => updateMovie(movie.id)}
              >
                Update Title
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button
          className="bg-black text-white px-3 py-1 cursor-pointer"
          onClick={() => uploadFileFunc()}
        >
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;
