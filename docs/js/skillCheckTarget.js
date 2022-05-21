class SkillCheckTarget {
    constructor(sz) {
      this.sz = sz;

      this.trap_offset_x = this.sz * 0.02;
  
      this.midPoint = new Point(random(this.trap_offset_x*8,this.sz-this.trap_offset_x*8), (this.sz * 0.04) / 2);
  
      this.width_good = this.sz * 0.18;
      this.width_great = this.width_good / 2.222;
  
      this.height = this.sz * 0.04;
  
      this.skill_check_result = "miss";
  
  
      this.COLOR_GOOD = color(72,96,102);
      this.COLOR_GREAT = color(71,157,139);
      this.COLOR_STROKE_GOOD = color(80,110,120);
      this.COLOR_STROKE_GREAT = color(105,170,149);
    }
  
    show() {
      strokeWeight(3);
      stroke(this.COLOR_STROKE_GOOD);
      rectMode(CENTER);
      fill(this.COLOR_GOOD);
      rect(this.midPoint.x, this.midPoint.y, this.width_good, this.height);
  
      stroke(this.COLOR_STROKE_GREAT)
      fill(this.COLOR_GREAT);
      rect(this.midPoint.x, this.midPoint.y, this.width_great, this.height);
      noFill();
      noStroke();
    }
  
    playSound(skill_check_point) {
      var lower_bound_good = this.midPoint.x - (this.width_good / 2);
      var upper_bound_good = this.midPoint.x + (this.width_good / 2);
  
      var lower_bound_great = this.midPoint.x - (this.width_great / 2);
      var upper_bound_great = this.midPoint.x + (this.width_great / 2);
  
      // missed skill check
      if ((skill_check_point < lower_bound_good) || (skill_check_point > upper_bound_good)) {
        if (document.querySelector('#checkbox_skill_check_result').checked) {
          audio_skill_check_miss.play();
        }
        
        this.skill_check_result = "miss";
      }
  
      // good skill check
      else if ((lower_bound_good <= skill_check_point && skill_check_point < lower_bound_great) || (upper_bound_great < skill_check_point && skill_check_point <= upper_bound_good)) {
        if (document.querySelector('#checkbox_skill_check_result').checked) {
          audio_skill_check_good.play();
        }
        
        this.skill_check_result = "good";
      }
  
      // great skill check
      else if (lower_bound_great <= skill_check_point && skill_check_point <= upper_bound_great) {
        if (document.querySelector('#checkbox_skill_check_result').checked) {
          audio_skill_check_great.play();
        }
        
        this.skill_check_result = "great";
      }
    }

    updatePosition(oldWidth, newWidth) {
      this.sz = newWidth;
      this.midPoint.updatePosition(oldWidth, newWidth);
      this.midPoint.y = (newWidth * 0.04) / 2
      this.trap_offset_x = newWidth * 0.02;
      this.width_good = newWidth * 0.18;
      this.width_great = this.width_good / 2.222;
      this.height = newWidth * 0.04;
    }
  }