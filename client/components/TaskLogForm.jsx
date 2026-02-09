import React, { useState, useEffect } from 'react';

const TaskLogForm = ({ initialData, onSubmit, onCancel, userId }) => {
  const [formData, setFormData] = useState(initialData || {
    day: '',
    learned: '',
    technical: '',
    tomorrow: ''
  });
  const [selectedColor, setSelectedColor] = useState(initialData?.color || 'bg-green-500');

  useEffect(() => {
    setFormData(initialData || {
      day: '',
      learned: '',
      technical: '',
      tomorrow: ''
    });
    setSelectedColor(initialData?.color || 'bg-green-500');
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, color: selectedColor, userId });
  };

  return (
    <div className="w-full max-w-lg rounded-2xl p-6 bg-gray-600">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-semibold text-white">Daily Check-in</h2>
        <p className="text-sm text-gray-300">Focus on what really matters today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Color Picker */}
        <div>
          <label className="text-xs text-gray-300 block mb-2">
            Choose calendar color
          </label>
          <div className="flex gap-3">
            {['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'].map(color => (
              <button
                type="button"
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full ${color} ring-2 ${
                  selectedColor === color ? 'ring-white' : 'ring-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <label className="text-xs text-gray-300 block mb-1">How was your day?</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            name="day"
            rows="2"
            placeholder="Quick summary of your day..."
            value={formData.day}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xs text-gray-300 block mb-1">What did you learn today?</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            name="learned"
            rows="2"
            placeholder="New concepts, insights..."
            value={formData.learned}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xs text-gray-300 block mb-1">Technical progress</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-500"
            name="technical"
            rows="2"
            placeholder="DSA, React, projects, tools..."
            value={formData.technical}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xs text-gray-300 block mb-1">Main focus for tomorrow</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
            name="tomorrow"
            rows="2"
            placeholder="Top 1–3 priorities"
            value={formData.tomorrow}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition text-white font-medium shadow-lg"
        >
          Save Check-in
        </button>
      </form>

      <button
        onClick={onCancel}
        className="text-red-400 mt-4 w-full text-center hover:text-red-300 transition"
      >
        Close
      </button>
    </div>
  );
};

export default TaskLogForm;
