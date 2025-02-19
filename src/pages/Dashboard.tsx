import React, { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { read, utils } from 'xlsx';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('excel_data')
        .select('*')
        .order('uploaded_at', { ascending: false });
      
      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      toast.error('Error fetching files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
      toast.error('Please upload an Excel file (.xlsx)');
      return;
    }

    setUploading(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      const { error } = await supabase.from('excel_data').insert({
        file_name: file.name,
        data: jsonData,
        user_id: user.id // Add the user_id here
      });

      if (error) throw error;
      toast.success('File uploaded successfully');
      fetchFiles();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading file');
    } finally {
      setUploading(false);
      // Clear the file input
      event.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('excel_data')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('File deleted successfully');
      setFiles(files.filter(file => file.id !== id));
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Upload Excel File</h2>
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Upload className="h-5 w-5 mr-2" />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Your Files</h3>
        </div>
        {files.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No files uploaded yet
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.file_name}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(file.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="inline-flex items-center p-2 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}