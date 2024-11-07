// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import backgroundImage from "../../assets/pollutions_mer.jpeg";
// import { Loader, MoveRightIcon } from "lucide-react";
// import { useLoginMutation } from "../../slices/userApiSlice";
// import { setCredentials } from "../../slices/authSlice";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/site";

//   useEffect(() => {
//     if (userInfo) {
//       if (userInfo.role === "Admin") {
//         navigate("/admin-dashboard");
//       } else if (userInfo.role === "User") {
//         navigate("/user-dashboard");
//       } else if (userInfo.role === "Private") {
//         navigate("/private-dashboard");
//       } else {
//         navigate(redirect);
//       }
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-600 p-4">
//       <div className="flex flex-col md:flex-row bg-gray-800 text-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl h-[500px]">

//         {/* Section gauche */}
//         <div className="p-6 md:p-16 flex-1 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold mb-4">Connexion</h2>
//           <p className="text-sm text-gray-300 mb-8">
//             Connectez-vous à votre compte pour accéder à la plateforme.
//           </p>
//           <form onSubmit={submitHandler}>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input input-bordered w-full mb-4 bg-gray-700"
//               placeholder="Entrez votre adresse email"
//             />
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input input-bordered w-full bg-gray-700"
//               placeholder="Entrez votre mot de passe"
//             />
//             <button
//               type="submit"
//               className="btn btn-primary w-full mt-6 flex justify-center items-center"
//             >
//               {isLoading ? <Loader className="animate-spin" /> : "Connexion"}
//             </button>
//           </form>
//           <div className="flex items-center justify-between mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-primary hover:text-opacity-80"
//             >
//               Mot de passe oublié ?
//             </Link>
//           </div>
//         </div>

//         {/* Section droite avec image */}
//         <div className="hidden md:flex h-full flex-1">
//           <img
//             src={backgroundImage}
//             alt="Vue d'accueil"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import backgroundImage from "../../assets/pollutions_mer.jpeg";
import { Loader, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { BsFacebook, BsGoogle } from "react-icons/bs";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate("/admin-dashboard");
      } else if (userInfo.role === "User") {
        navigate("/dashboard");
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-10 bg-gray-700 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* left side  */}
          <div className="p-4 md:p-20 ">
            {/* top content */}
            <h2 className="mb-5 text-4xl font-bold ">Connection</h2>
            <p className="max-w-md mb-8 font-light">
              Connectez-vous à votre compte pour profiter de notre plateforme.
            </p>
            <form onSubmit={submitHandler}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3 "
                placeholder="Entrez votre addresse"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light "
                placeholder="Entrez votre mot de passe"
              />
              <button
                type="submit"
                className="w-full mt-6  flex justify-center items-center p-3 space-x-4 font-bold  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
              >
                {isLoading ? <Loader /> : "Connexion"}
              </button>
            </form>
            <div className="flex items-center justify-between mt-6">
              <Link
                to="/register"
                className="text-primaryColor hover:text-opacity-90"
              >
                Créer un compte
              </Link>
              <Link
                to="/forgot-password"
                className="text-primaryColor hover:text-opacity-90"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* middle-content */}

            <div className="mt-8 border-b border-b-gray-200"></div>

            <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <Link
                to={"/"}
                className="w-full  flex justify-center items-center p-3 space-x-4 font-bold text-white  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg  transition hover:-translate-y-0.5 duration-150"
              >
                <MoveRightIcon className="mr-5" />
                Retour au site
              </Link>
            </div>
          </div>

          {/* right side  */}
          <img
            src={backgroundImage}
            className="w-[600px] hidden md:block object-cover rounded-r-2xl"
            alt="Bouchons de bouteilles en plastique"
          />
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
