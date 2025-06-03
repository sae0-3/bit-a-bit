CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('professor', 'admin')) DEFAULT 'professor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE patterns (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  complexity INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  initial_sequence TEXT NOT NULL,
  validation_mode TEXT NOT NULL CHECK (validation_mode IN ('final_sequence', 'exact_path')) DEFAULT 'final_sequence',
  created_by UUID NOT NULL REFERENCES users(id),
  min_age INTEGER,
  max_age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE question_patterns (
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  pattern_id INTEGER REFERENCES patterns(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, pattern_id)
);

CREATE TABLE valid_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  path JSONB NOT NULL,
  final_sequence TEXT NOT NULL,
  is_optimal BOOLEAN DEFAULT FALSE
);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_questions_updated_at
BEFORE UPDATE ON questions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
