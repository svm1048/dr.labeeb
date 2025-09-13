-- Add missing policies for lessons table to complete RLS coverage
CREATE POLICY "Trainers can manage their course lessons" ON public.lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    JOIN public.profiles ON profiles.id = courses.trainer_id 
    WHERE courses.id = lessons.course_id 
    AND profiles.user_id = auth.uid()
  )
);