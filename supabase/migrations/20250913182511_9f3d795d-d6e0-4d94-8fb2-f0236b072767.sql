-- Add missing policies for certificates table
CREATE POLICY "Students can view their own certificates" ON public.certificates FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = certificates.student_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "System can create certificates" ON public.certificates FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all certificates" ON public.certificates FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Trainers can view certificates for their courses" ON public.certificates FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    JOIN public.profiles ON profiles.id = courses.trainer_id 
    WHERE courses.id = certificates.course_id 
    AND profiles.user_id = auth.uid()
  )
);