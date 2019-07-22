import { GenerateSaveNonAuthUserIdPipe } from './generate-save-non-auth-user-id.pipe';

describe('GenerateSaveNonAuthUserIdPipe', () => {
  it('create an instance', () => {
    const pipe = new GenerateSaveNonAuthUserIdPipe();
    expect(pipe).toBeTruthy();
  });
});
