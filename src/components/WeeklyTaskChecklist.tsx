import React from 'react';
import { CheckCircle2, Circle, BookOpen, Zap, Beaker, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface SubjectTasks {
  subject: string;
  icon: any;
  color: string;
  tasks: Task[];
}

export default function WeeklyTaskChecklist() {
  const [subjectTasks, setSubjectTasks] = React.useState<SubjectTasks[]>([
    {
      subject: 'Chemistry',
      icon: Beaker,
      color: 'text-purple-500',
      tasks: [
        { id: 'c1', title: 'Homework', completed: false },
        { id: 'c2', title: 'Paper Review (with past papers)', completed: false },
        { id: 'c3', title: 'Past Lesson Review', completed: false },
        { id: 'c4', title: 'Missed Lesson Learning & Practice', completed: false },
      ]
    },
    {
      subject: 'Physics',
      icon: Zap,
      color: 'text-blue-500',
      tasks: [
        { id: 'p1', title: 'Homework', completed: false },
        { id: 'p2', title: 'Paper Review (with past papers)', completed: false },
        { id: 'p3', title: 'Past Lesson Review', completed: false },
        { id: 'p4', title: 'Missed Lesson Learning & Practice', completed: false },
        { id: 'p5', title: 'Practical Lesson Learning & Practice', completed: false },
      ]
    },
    {
      subject: 'Combined Maths',
      icon: Calculator,
      color: 'text-green-500',
      tasks: [
        { id: 'm1', title: 'Homework', completed: false },
        { id: 'm2', title: 'Paper Review (with past papers)', completed: false },
        { id: 'm3', title: 'Past Lesson Review', completed: false },
        { id: 'm4', title: 'Missed Lesson Learning & Practice', completed: false },
      ]
    }
  ]);

  const toggleTask = (subjectIndex: number, taskId: string) => {
    const newTasks = [...subjectTasks];
    const task = newTasks[subjectIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setSubjectTasks(newTasks);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1DB954]/20 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#1DB954]" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">Weekly Focus Tasks</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Your core requirements for each subject</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjectTasks.map((section, sIndex) => (
          <motion.div 
            key={section.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.1 }}
            className="bg-[#181818] rounded-3xl border border-white/5 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", section.color)}>
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">{section.subject}</h3>
            </div>
            <div className="p-4 space-y-2">
              {section.tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(sIndex, task.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group",
                    task.completed ? "bg-[#1DB954]/10 text-gray-500" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#1DB954] shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600 group-hover:text-gray-400 shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    task.completed && "line-through"
                  )}>
                    {task.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
