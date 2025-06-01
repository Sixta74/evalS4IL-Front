import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//ProviderHydration trouvé sur stackoverflow pendant le PI
//Permet de réactualiser les variable/objet facielment.

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideClientHydration()],
}).catch((err) => console.error(err));
