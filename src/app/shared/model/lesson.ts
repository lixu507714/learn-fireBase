export class Lesson {
  constructor (
    public $key: string,
    public description: string,
    public duration: string,
    public url: string,
    public tags: string,
    public pro: string,
    public longDescription: string,
    public courseId: string,
    public videoUrl:string) {

  }

  // 判断是否包含BEGINNER的tag。包含返回true。否则返回false
  get isBeginner() {
    return this.tags && this.tags.includes('BEGINNER');
  }

  static fromJsonList (array):Lesson[] {
    return array.map(Lesson.fromJson);
  }

  static fromJson ({$key, description, duration, url, tags, pro, longDescription, courseId, videoUrl}) :Lesson {
    return new Lesson(
      $key,
      description,
      duration,
      url,
      tags,
      pro,
      longDescription,
      courseId,
      videoUrl);
  }
}
