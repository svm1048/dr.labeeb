-- Add missing RLS policies for quiz_questions
CREATE POLICY "Quiz questions viewable based on course access" ON public.quiz_questions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.quizzes 
    JOIN public.courses ON courses.id = quizzes.course_id 
    WHERE quizzes.id = quiz_questions.quiz_id 
    AND courses.is_published = true
  )
  OR
  EXISTS (
    SELECT 1 FROM public.quizzes 
    JOIN public.enrollments ON enrollments.course_id = quizzes.course_id 
    JOIN public.profiles ON profiles.id = enrollments.student_id 
    WHERE quizzes.id = quiz_questions.quiz_id 
    AND profiles.user_id = auth.uid()
    AND enrollments.payment_status = 'paid'
  )
);

CREATE POLICY "Trainers can manage quiz questions" ON public.quiz_questions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.quizzes 
    JOIN public.courses ON courses.id = quizzes.course_id 
    JOIN public.profiles ON profiles.id = courses.trainer_id 
    WHERE quizzes.id = quiz_questions.quiz_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Add missing RLS policies for quiz_attempts
CREATE POLICY "Students can view their own quiz attempts" ON public.quiz_attempts FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = quiz_attempts.student_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Students can insert their own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = quiz_attempts.student_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Add missing RLS policies for quizzes
CREATE POLICY "Quizzes viewable based on course access" ON public.quizzes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = quizzes.course_id 
    AND courses.is_published = true
  )
  OR
  EXISTS (
    SELECT 1 FROM public.enrollments 
    JOIN public.profiles ON profiles.id = enrollments.student_id 
    WHERE enrollments.course_id = quizzes.course_id 
    AND profiles.user_id = auth.uid()
    AND enrollments.payment_status = 'paid'
  )
);

CREATE POLICY "Trainers can manage quizzes" ON public.quizzes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    JOIN public.profiles ON profiles.id = courses.trainer_id 
    WHERE courses.id = quizzes.course_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Add admin policies for all tables
CREATE POLICY "Admins can manage all quiz questions" ON public.quiz_questions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can manage all quiz attempts" ON public.quiz_attempts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can manage all quizzes" ON public.quizzes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can manage all lessons" ON public.lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);