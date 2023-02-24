function ContactDish ({
    _id,
    _title,
    _picture,
    _difficulty,
    _description,
    _recipe
}) {
    this.m_id = _id;
    this.m_title = _title;
    this.m_picture = _picture;
    this.m_difficulty = _difficulty;
    this.m_description = _description;
    this.m_recipe = _recipe;
}



ContactDish.prototype.getPicture = function() {
    return this.m_picture;
}

ContactDish.prototype.isValid = function() {
    if (isEmpty(this.m_title)) {
        throw new Error ("Missing Title");
    }

    if (isEmpty(this.m_picture)) {
        throw new Error ("Missing Picture");
    }

    if (isEmpty(this.m_difficulty)) {
        throw new Error ("Missing Difficulty");
    }

    if (isEmpty(this.m_description)) {
        throw new Error ("Missing Description");
    }

    if (isEmpty(this.m_recipe)) {
        throw new Error ("Missing Recipe");
    }
    return true;
}