import { useState } from "react";
import { bookTrip } from "../../services/tripService";

export default function TripForm({ onSuccess }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full bg-[#060B16] border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookTrip({
        sourceName: form.sourceName,
        destinationName: form.destinationName,
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="text-gray-400 text-sm">
          Source Location
        </label>
        <input
          name="sourceName"
          placeholder="e.g. Bangalore Palace"
          className={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm">
          Destination Location
        </label>
        <input
          name="destinationName"
          placeholder="e.g. MG Road Bangalore"
          className={inputStyle}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 rounded-lg transition"
      >
        {loading ? "Creating..." : "Book Trip"}
      </button>
    </form>
  );
}