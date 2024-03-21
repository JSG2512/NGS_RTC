export class Util {
  public static unixTimestampToISO8601(unixTimestamp: number): string {
    // Unix 타임스탬프를 밀리초로 변환합니다 (자바스크립트의 Date 객체는 밀리초를 기반으로 합니다)
    const date = new Date(unixTimestamp * 1000);

    // Date 객체를 ISO 8601 형식의 문자열로 변환합니다.
    return date.toISOString();
  }
}
