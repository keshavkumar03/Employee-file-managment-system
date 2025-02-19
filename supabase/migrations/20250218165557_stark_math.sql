/*
  # Excel File Management System Schema

  1. New Tables
    - `excel_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `file_name` (text)
      - `uploaded_at` (timestamp with time zone)
      - `data` (jsonb)

  2. Security
    - Enable RLS on `excel_data` table
    - Add policies for:
      - Insert: Only authenticated users can upload their own data
      - Select: Users can only view their own data
      - Delete: Users can only delete their own data
*/

CREATE TABLE IF NOT EXISTS excel_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  file_name text NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  data jsonb NOT NULL,
  CONSTRAINT valid_file_name CHECK (length(file_name) > 0)
);

-- Enable Row Level Security
ALTER TABLE excel_data ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own data"
  ON excel_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own data"
  ON excel_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data"
  ON excel_data
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_excel_data_user_id ON excel_data(user_id);
CREATE INDEX IF NOT EXISTS idx_excel_data_uploaded_at ON excel_data(uploaded_at DESC);