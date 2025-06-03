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


INSERT INTO patterns (code, name, description, is_active) VALUES
('mirror', 'Simetría', 'Invierte la secuencia como si fuera un espejo.', true),
('rotate_left', 'Rotar a la izquierda', 'Desplaza todos los elementos una posición a la izquierda.', true),
('rotate_right', 'Rotar a la derecha', 'Desplaza todos los elementos una posición a la derecha.', true),
('shift_left', 'Desplazar a la izquierda', 'Desplaza todos los elementos a la izquierda y elimina el primero.', false),
('shift_right', 'Desplazar a la derecha', 'Desplaza todos los elementos a la derecha y elimina el último.', false),
('swap_ends', 'Intercambiar extremos', 'Intercambia el primer y el último elemento.', false),
('alternate_flip', 'Alternar pares', 'Invierte los elementos en posiciones pares, dejando los impares igual.', false),
('swap_adjacent', 'Intercambiar adyacentes', 'Intercambia cada par de elementos contiguos (1↔2, 3↔4, etc.).', false),
('zero_middle', 'Vaciar centro', 'Reemplaza el elemento central (o centrales) con ceros.', false),
('center_to_ends', 'Centro a extremos', 'Mueve el elemento central al inicio y al final de la secuencia.', false),
('ends_to_center', 'Extremos al centro', 'Mueve el primer y el último elemento al centro de la secuencia.', false),
('swap_last_left', 'Mover último a la izquierda', 'Mueve el último elemento una posición hacia la izquierda.', false),
('swap_first_right', 'Mover primero a la derecha', 'Mueve el primer elemento una posición hacia la derecha.', false);
