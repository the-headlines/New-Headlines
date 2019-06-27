import { GetUrlBasePipe } from './get-url-base.pipe';

describe('GetUrlBasePipe', () => {
  it('create an instance', () => {
    const pipe = new GetUrlBasePipe();
    expect(pipe).toBeTruthy();
  });
});
