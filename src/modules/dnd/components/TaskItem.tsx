import { Task } from '../types';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div id='card' style={{border:"solid",padding:"20px",backgroundColor:"firebrick"}}>
      <div>{task.title}</div>
    </div>
  );
};

export default TaskItem;
