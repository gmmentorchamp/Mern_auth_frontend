import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function PaidQuestion() {
    const [loading, setLoading] = useState(true);
    const [isPaid, setIsPaid] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
        setAuthToken(token);

        async function fetchMe() {
            try {
                const res = await API.get("/user/me");
                setIsPaid(res.data.isPaid);
            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        }
        fetchMe();
    }, []);

    const choose = async (val) => {
        try {
            const res = await API.post("/user/paid", { isPaid: val });
            setIsPaid(res.data.isPaid);
            if (res.data.isPaid) {
                setMessage("Thanks for becoming a paid user");
            } else {
                setMessage("Why don’t you join our family?");
            }
            // optionally navigate to a thanks page:
            navigate("/thanks", { state: { isPaid: res.data.isPaid } });
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-400 to-pink-500 p-4">
  <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30">

    <h2 className="text-2xl font-semibold text-white drop-shadow mb-6">
      Are you a Paid User?
    </h2>

    <div className="flex justify-center gap-6">
      <button
        onClick={() => choose(true)}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-lg transition transform hover:scale-105"
      >
        Yes
      </button>

      <button
        onClick={() => choose(false)}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-lg transition transform hover:scale-105"
      >
        No
      </button>
    </div>

    {message && (
      <p className="mt-6 text-lg font-medium text-white drop-shadow">
        {message}
      </p>
    )}
  </div>
</div>

    );
}
