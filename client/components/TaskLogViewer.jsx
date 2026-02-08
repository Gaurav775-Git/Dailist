import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskLogForm from './TaskLogForm';

const TaskLogViewer = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLog, setEditingLog] = useState(null); // State to store the log being edited

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`https://dailist-1.onrender.com/api/daily-log/user/${userId}`, {
        withCredentials: true
      });
      setLogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching task logs:', err);
      setError('Failed to fetch task logs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLogs();
    }
  }, [userId]);

  const handleEdit = (log) => {
    setEditingLog(log);
  };

  const handleCancelEdit = () => {
    setEditingLog(null);
  };

  const handleSubmitEdit = async (formData) => {
    try {
      await axios.put(
        `https://dailist-1.onrender.com/api/daily-log/${editingLog._id}`,
        {
          ...formData,
          date: editingLog.date, // Ensure date is not changed during edit
        },
        {
          withCredentials: true
        }
      );
      setEditingLog(null);
      fetchLogs(); // Refresh logs after successful edit
    } catch (err) {
      console.error('Error updating task log:', err);
      alert('Error updating task log.');
    }
  };

  if (loading) {
    return <div className="text-white">Loading task logs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (editingLog) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <TaskLogForm
          initialData={editingLog}
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelEdit}
          userId={userId}
        />
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-white">Previous Task Logs</h2>
      <div className="space-y-4">
        {logs.map(log => (
          <div key={log._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-white">Date: {log.date}</h3>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => handleEdit(log)}
              >
                Edit
              </button>
            </div>
            <p className="text-gray-300"><strong>Day:</strong> {log.day}</p>
            <p className="text-gray-300"><strong>Learned:</strong> {log.learned}</p>
            <p className="text-gray-300"><strong>Technical:</strong> {log.technical}</p>
            <p className="text-gray-300"><strong>Tomorrow:</strong> {log.tomorrow}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskLogViewer;
