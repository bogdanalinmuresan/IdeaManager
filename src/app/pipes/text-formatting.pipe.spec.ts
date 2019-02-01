import { TextFormattingPipe } from './text-formatting.pipe';

describe('TextFormattingPipe', () => {
  it('create an instance', () => {
    const pipe = new TextFormattingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform italic', () => {

    let input1 = "*italic*";
    let input2 = "_italic_";

    let expected = "<p><em>italic</em></p>\n";

    const pipe = new TextFormattingPipe();
    expect(pipe.transform(input1)).toBe(expected);
    expect(pipe.transform(input2)).toBe(expected);
  });

  it('should transform bold', () => {

    let input1 = "**bold**";
    let input2 = "__bold__";

    let expected = "<p><strong>bold</strong></p>\n";

    const pipe = new TextFormattingPipe();
    expect(pipe.transform(input1)).toBe(expected);
    expect(pipe.transform(input2)).toBe(expected);
  });

  it('should transform strikethrough', () => {

    let input1 = "~~del~~";

    const pipe = new TextFormattingPipe();
    expect(pipe.transform(input1)).toBe("<p><del>del</del></p>\n");
  })
});
