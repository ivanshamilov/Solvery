class Level {
    constructor(id, points_for_level, title, level_type_id, tasks, level_icon, done, total){
        this.id = id;
        this.points_for_level = points_for_level;
        this.title = title;
        this.level_type_id = level_type_id;
        this.tasks = tasks;
        this.level_icon = level_icon;
        this.done = done; //
        this.total = total; // 
    }
}

export default Level;