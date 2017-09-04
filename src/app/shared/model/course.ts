// class 类方法有一个constructor构造器，构造函数 ，类里边有两个静态方法，
// observable -> next -> subscribe(订阅)
export class Course {
  constructor (
    public $key: string,
    public description: string,
    public iconUrl: string,
    public url: string,
    public longDescription: string) {

  }


  static fromJson ({$key, description, iconUrl, url, longDescription}) {
    // 实例化 Course 数据对应
    return new Course (
      $key,
      description,
      iconUrl,
      url,
      longDescription);
  }

  static fromJsonArray (json:any[]):Course[] {
    return json.map(Course.fromJson);
  }
}
