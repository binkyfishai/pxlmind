import React from 'react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="documentation-page">
      <div className="content-container">
        <header className="documentation-header">
          <h1>PixelMind Explainer Developer's Guide</h1>
          <div className="document-meta">
            <span className="version">v2.0</span>
            <span className="motto">
              <em>Ars longa, vita brevis, intelligentia artificialis adest.</em>
              <br />
              (Art is long, life is short, and artificial intelligence is here.)
            </span>
          </div>
        </header>

        <div className="documentation-content">
          <section className="introduction">
            <h2>Introduction: A New Genesis — You, the Creator in the AI Epoch</h2>
            <p>
              Welcome, Developer, to the inner sanctum of PixelMind. What you are about to unfold is not a mere document, 
              but a star chart for a new era of creation. Throughout the long river of human history, we have used frescoes, 
              sculptures, text, and film to record and transmit knowledge. Today, we embark on a new chapter together: 
              <strong> to "write" reality directly in three-dimensional space, with intelligence as our brush and code as our ink.</strong>
            </p>
            
            <p>
              The <em>PixelMind Explainer Technical White Paper</em> is our declaration to the world, heralding the advent 
              of an era of "intelligent concept to instant visualization." This <em>Ultimate Developer's Guide</em>, in turn, 
              is the genesis tool and compass we bestow upon you. It will reveal how we transform the poetic metaphor of 
              "conducting an AI symphony orchestra" into a rigorous, powerful, and infinitely scalable engineering practice.
            </p>

            <p>
              We will bid a final farewell to the tedious "pixel-by-pixel world-building" of traditional 3D development. 
              In its place, a creative workflow of unprecedented power emerges: you propose a profound philosophical proposition 
              ("demonstrate the universality of Newton's third law"), a complex biological marvel ("visualize the translation 
              process of messenger RNA in a ribosome"), or a precise engineering feat ("simulate the turbine operation of a jet engine"). 
              Then, an elite team of AI specialists, under your command, progressively materializes this abstract idea into a 
              tangible, interactive digital twin.
            </p>

            <p>
              The core of this guide is a deep exploration of how we precisely and losslessly "compile" the AI's "creative intent" 
              into instructions that <strong>Three.js</strong> can understand and execute. Three.js, that great WebGL library, 
              has its role elevated to new heights within our system: it is no longer the script you must write line by line, 
              but the ultimate <strong>"universal laws of physics"</strong> and <strong>"scene description language"</strong> 
              for our entire intelligent system. All the wisdom, planning, and design of the AI specialists converge into a 
              series of meticulously designed JSON "blueprints." Every byte of these blueprints contains a precise invocation 
              of a specific Three.js feature—be it lighting, materials, physics, or interaction.
            </p>

            <p>
              This document will be a long but deeply rewarding journey. We will dissect, with unprecedented depth, how a 
              single natural language <code>goal</code> is transformed through a multi-agent workflow, layer by layer, to 
              ultimately generate every detail required to drive a complex Three.js scene. We will introduce new artifacts, 
              like <code>physics.json</code>, and profoundly expand our understanding of <code>scene.json</code>, 
              <code>animation.json</code>, and <code>interaction.json</code>.
            </p>

            <p>
              Forget your preconceptions about traditional development. Here, you are the director, the playwright, the 
              architect of worldviews. Your AI team is assembled and ready. The infinite potential of Three.js awaits its unlocking.
            </p>

            <p>
              Now, let us turn the first page and begin this magnificent journey of creation.
            </p>
          </section>

          <section className="chapter">
            <h2>Chapter 1: The Genesis Philosophy of PixelMind — The "First Principles" of AI Collaboration</h2>
            
            <p>
              Before we delve into every detail of Three.js, we must first establish a consensus on the foundational 
              principles of our thought. Understanding the "first principles" behind our architectural choices is the 
              key to your transformation from a "user" to a "master."
            </p>

            <h3>1.1 Beyond "Generation," Embracing "Construction"</h3>
            
            <p>
              The dominant paradigm in the current AI landscape is "Generation"—the end-to-end production of a result 
              (text, image, video). This paradigm excels at creating stunning "first drafts" but often lacks engineering 
              rigor, controllability, and determinism. PixelMind embraces a more advanced paradigm: <strong>"Construction."</strong>
            </p>

            <ul>
              <li><strong>Generation is the artist's flourish:</strong> Fast, inspired, but with details that are difficult to control.</li>
              <li><strong>Construction is the architect's blueprint:</strong> Rigorous, modular, with each part having a clear function and interface, resulting in a precise and reliable outcome.</li>
            </ul>

            <p>
              Our multi-agent workflow is, in essence, an <strong>AI-driven construction system</strong>. It does not 
              attempt to "generate" the final 3D scene in a single leap. Instead, like an architectural project, it is 
              divided into phases. Each phase is completed by the most suitable expert (an AI agent) and produces 
              standardized "building components" (JSON artifacts).
            </p>

            <h3>1.2 The Renaissance of Expert Systems: "Divide and Conquer" in the Age of AI</h3>
            
            <p>
              "Divide and Conquer" is an ancient wisdom of computer science. In PixelMind, we apply this wisdom to AI itself. 
              We firmly believe that a collaborative network of multiple <strong>Weakly Specialized AIs</strong> will far 
              surpass the combined capability and reliability of a single, monolithic <strong>Strongly General AI</strong> 
              that attempts to do everything.
            </p>

            <div className="agent-descriptions">
              <div className="agent">
                <h4>The Oracle (Knowledge Extraction Expert)</h4>
                <p>
                  Its sole mission is to become a top scholar in a specific domain. When the task is "the pumping action 
                  of the heart," it immerses itself in medical literature; for "tidal forces of a black hole," it becomes 
                  an astrophysicist. It cares not for 3D rendering, only for outputting the purest, most accurate structured knowledge.
                </p>
              </div>

              <div className="agent">
                <h4>The Architect (Scene Layout Expert)</h4>
                <p>
                  It is the Michelangelo of digital space. It receives knowledge and transforms it into spatial art. Its 
                  expertise lies in composition, lighting aesthetics, spatial narrative, and a vast knowledge of our 3D 
                  component library. It is not concerned with animation timing, only with constructing a perfect static "stage."
                </p>
              </div>

              <div className="agent">
                <h4>The Newton (Physics Simulation Expert)</h4>
                <p>
                  This is a newly introduced, crucial expert. It is responsible for injecting "realism" into the scene. 
                  Its world is composed of forces, mass, collisions, and constraints. It doesn't care what an object <em>is</em>, 
                  only how it <em>obeys</em> the laws of physics.
                </p>
              </div>

              <div className="agent">
                <h4>The Choreographer (Animation Sequence Expert)</h4>
                <p>
                  It is the dancer of time. It combines the static stage with dynamic knowledge, orchestrating elegant or 
                  intense "dynamic ballets." Its language is timelines, easing curves, and keyframes.
                </p>
              </div>

              <div className="agent">
                <h4>The Gamemaster (Interaction Design Expert)</h4>
                <p>
                  It is the bridge between the user and the world. It thinks not about "what the world looks like," but 
                  "how the user will experience this world." Its tools are events, state machines, and user feedback.
                </p>
              </div>
            </div>

            <h3>1.3 JSON: The "String Theory" of Our Universe</h3>
            
            <p>
              If the AI experts are deities, then structured JSON is the language they use to write the laws of the universe. 
              In PixelMind, the status of JSON is elevated to an unprecedented height. It is not merely a data exchange format, but:
            </p>

            <ul>
              <li>
                <strong>A Declarative World Description Language:</strong> We do not use imperative code ("create a cube, 
                move it, rotate it"). Instead, we use declarative JSON ("there exists a cube, its position is [x,y,z], 
                its rotation is [a,b,c]") to describe the <strong>final state</strong> of the world. This makes it easier 
                for AI to understand and generate.
              </li>
              <li>
                <strong>A Strictly Verifiable Contract:</strong> Each JSON artifact adheres to a strict Schema. This 
                ensures that the output of an upstream AI expert is always a valid input that downstream modules can 
                understand, preventing "creative derailment."
              </li>
              <li>
                <strong>A Human-Readable and Debuggable Intermediate Language:</strong> When problems arise, you can 
                directly inspected these JSON files, just like reading architectural blueprints, to pinpoint the issue—was 
                the knowledge wrong? Was the layout irrational? Or was the animation timing flawed?
              </li>
            </ul>

            <h3>1.4 The Ultimate Role of Three.js: The Faithful World "Rendering Engine"</h3>
            
            <p>
              We hold Three.js in the highest esteem, and thus we assign it the purest, most central role: <strong>rendering</strong>. 
              The frontend <code>Conductor</code> module is the sole and absolute "enforcer of physical law" in this universe. 
              Its workflow can be poetically described as:
            </p>

            <ol>
              <li><strong>Hearing the Genesis Epic:</strong> Load all JSON artifacts (<code>scene.json</code>, <code>physics.json</code>, <code>animation.json</code>, <code>interaction.json</code>, etc.) at once.</li>
              <li><strong>Constructing the Static Cosmic Skeleton:</strong> Based on <code>scene.json</code>, flawlessly build the Three.js Scene Graph, creating every geometry, material, light, and camera.</li>
              <li><strong>Injecting the Laws of Physics:</strong> Based on <code>physics.json</code>, initialize the physics world (e.g., using <code>Rapier.js</code>) and create corresponding "Rigid Bodies" for objects in the scene graph.</li>
              <li><strong>Setting the Flow of Time:</strong> Based on <code>animation.json</code>, set up all animation timelines and keyframes.</li>
              <li><strong>Bestowing a Spirit Upon All Things:</strong> Based on <code>interaction.json</code>, bind event listeners and state machines to objects.</li>
              <li>
                <strong>Initiating the "Big Bang" (The Render Loop):</strong> Start the <code>requestAnimationFrame</code> loop. In each frame, it does only three things:
                <ul>
                  <li>Step the physics world simulation forward.</li>
                  <li>Synchronize the new positions and orientations of objects from the physics world to their corresponding visual objects in the Three.js scene graph.</li>
                  <li>Call <code>renderer.render(scene, camera)</code>, presenting this living, dynamic, and interactive world to the user.</li>
                </ul>
              </li>
            </ol>

            <p>
              By understanding this grand creation philosophy, you will no longer see the subsequent chapters as isolated 
              technical points, but as the interconnected and indispensable "fundamental particles" and "interaction forces" 
              required to build this intelligent universe.
            </p>
          </section>

          <section className="chapter">
            <h2>Chapter 2: The Cornerstones of the Universe — A Panoramic Analysis of Core Artifacts</h2>
            
            <p>
              Before we dive into every technical detail, let's take a bird's-eye view of all the "blueprint" files that 
              constitute our digital universe. These JSON artifacts, generated by the team of AI experts, are the bridge 
              connecting intent and reality.
            </p>

            <div className="artifact-grid">
              <div className="artifact">
                <h4><code>knowledge.json</code> (The Knowledge Blueprint)</h4>
                <p>
                  Generated by <strong>The Oracle</strong>. This is the source of everything, containing structured, 
                  semantic facts about the subject. It is pure "what," devoid of any visual representation.
                </p>
              </div>

              <div className="artifact">
                <h4><code>scene.json</code> (The Static Universe Blueprint)</h4>
                <p>
                  Generated by <strong>The Architect</strong>. It defines the "existence" of the world. It contains the 
                  scene graph, and the geometry, material, lighting, and camera for all objects. This is the world's 
                  skeleton and skin.
                </p>
              </div>

              <div className="artifact">
                <h4><code>physics.json</code> (The Dynamic Law Blueprint)</h4>
                <p>
                  Generated by <strong>The Newton</strong>. It defines the world's "rules of conduct." It contains objects' 
                  physical properties (mass, friction), collision shapes, and constraint relationships. These are the 
                  world's Newtonian laws.
                </p>
              </div>

              <div className="artifact">
                <h4><code>animation.json</code> (The Temporal Script Blueprint)</h4>
                <p>
                  Generated by <strong>The Choreographer</strong>. It defines the world's "evolutionary path." It contains 
                  pre-scripted dynamic changes that are independent of the physics simulation. It is the world's pulse 
                  and predetermined narrative.
                </p>
              </div>

              <div className="artifact">
                <h4><code>interaction.json</code> (The Response Contract Blueprint)</h4>
                <p>
                  Generated by <strong>The Gamemaster</strong>. It defines the "relationship" between the world and the 
                  "observer" (user). It contains events, triggerable actions, and state machines. This is the world's 
                  soul and its dialogue with the outside.
                </p>
              </div>
            </div>

            <p>
              In the next four chapters, we will dissect these core blueprints with unprecedented depth, demonstrating 
              how they map precisely to every corner of Three.js.
            </p>
          </section>

          <section className="chapter">
            <h2>Chapter 3: The World of Light and Form — Mastering the Art of <code>scene.json</code></h2>
            
            <p>
              In this chapter, we focus on the construction of the static world. <code>scene.json</code> is the foundation 
              of all visual presentation; its richness and precision directly determine the quality of the final scene. We 
              will learn how to direct <strong>The Architect</strong> to generate professional-grade scene descriptions 
              that fully leverage the powerful rendering capabilities of Three.js.
            </p>

            <h3>3.1 The Scene Graph: Building the Cosmic Hierarchy</h3>
            
            <p>
              The core of Three.js is the scene graph, a tree structure that manages all objects. In <code>scene.json</code>, 
              we describe it in a flat but relationally clear manner.
            </p>

            <ul>
              <li><strong><code>sceneGraph.nodes</code></strong>: Defines every "object" (<code>Object3D</code>) that exists in the universe.</li>
              <li><strong><code>sceneGraph.root</code></strong>: Specifies the root of this tree.</li>
              <li><strong><code>children</code></strong>: Defined within each node, clarifying its child nodes and thereby constructing the complete parent-child relationship.</li>
            </ul>

            <div className="code-example">
              <h4>Director's Practice:</h4>
              <p>In <code>master-plan.json</code>, you can influence the scene structure like this:</p>
              <pre><code>{`"params": {
  "groupings": [ // Instructs the AI on how to organize objects
    { "group_name": "cardiac_conduction_system", "components": ["sinoatrial_node", "purkinje_fibers"] }
  ]
}`}</code></pre>
              <p>
                This will cause the <code>SceneLayoutWorkflow</code> to generate a <code>THREE.Group</code> named 
                <code>cardiac_conduction_system_group</code> and place the corresponding components as its children, 
                greatly facilitating collective operations on the entire conduction system later (like highlighting or hiding).
              </p>
            </div>

            <h3>3.2 Geometry: The Source of All Form</h3>
            
            <p>Geometry defines the shape of an object.</p>

            <h4>Primitives:</h4>
            <div className="code-example">
              <strong>JSON Description:</strong>
              <pre><code>{`"geometry": {
  "type": "BoxGeometry", // Corresponds to new THREE.BoxGeometry()
  "width": 1, "height": 1, "depth": 1
}`}</code></pre>
              <p>
                <strong>Supported Types:</strong> <code>BoxGeometry</code>, <code>SphereGeometry</code>, 
                <code>CylinderGeometry</code>, <code>PlaneGeometry</code>, <code>TorusGeometry</code>, and all other 
                Three.js primitive geometries. The AI will select the most appropriate type based on the object's form 
                description in <code>knowledge.json</code> ("a spherical cell nucleus").
              </p>
            </div>

            <h4>Voxel Components:</h4>
            <p>This is a core feature of PixelMind, used for rapidly constructing complex models with a unified style.</p>
            <div className="code-example">
              <strong>JSON Description:</strong>
              <pre><code>{`"geometry": {
  "type": "VoxelComponent",
  "componentId": "human-heart-anatomical-v2", // References an ID in the component library
  "params": { "detail_level": "high" } // Parameters can be passed to the component's build function
}`}</code></pre>
              <p>
                <strong>Conductor's Execution:</strong> The <code>Conductor</code> calls the <code>AssetLoader</code>, 
                which looks up the component definition for the ID. If it's a <code>.gltf</code> model, it loads it; 
                if it's a <code>.js</code> file, it calls its <code>build(params)</code> function to dynamically 
                generate the geometry.
              </p>
            </div>

            <h4>External Models:</h4>
            <p>For high-fidelity, non-voxel style models.</p>
            <div className="code-example">
              <strong>JSON Description:</strong>
              <pre><code>{`"geometry": {
  "type": "GLTF",
  "url": "https://example.com/models/detailed_heart.glb"
}`}</code></pre>
              <p>
                <strong>Conductor's Execution:</strong> Uses <code>THREE.GLTFLoader</code> to load the model.
              </p>
            </div>

            <h3>3.3 Material: Granting Texture and Soul to All Things</h3>
            
            <p>
              The material determines how an object reacts to light—its appearance. This is key to creating realism and artistic feel.
            </p>

            <h4><code>MeshStandardMaterial</code>: The Core of PBR (Physically-Based Rendering)</h4>
            <p>This is the preferred material for creating realistic effects, based on the principles of Physically-Based Rendering.</p>
            
            <div className="code-example">
              <strong>JSON Description:</strong>
              <pre><code>{`"material": {
  "type": "MeshStandardMaterial",
  "color": "#A020F0",          // Base color (albedo)
  "metalness": 0.1,           // Metallicity (0=dielectric, 1=metal)
  "roughness": 0.8,           // Roughness (0=mirror, 1=fully diffuse)
  "map": "textures/ventricle_diffuse.png",  // Color map
  "normalMap": "textures/ventricle_normal.png", // Normal map, adds surface detail
  "roughnessMap": "textures/ventricle_roughness.png", // Roughness map
  "metalnessMap": "textures/ventricle_metalness.png", // Metalness map
  "aoMap": "textures/ventricle_ao.png", // Ambient Occlusion map, adds contact shadows
  "emissive": "#330000",        // Emissive color
  "emissiveIntensity": 0.5,     // Emissive intensity
  "transparent": true,          // Is it transparent?
  "opacity": 0.9                // Opacity level
}`}</code></pre>
            </div>

            <p>
              <strong>Conductor's Execution:</strong> The <code>Conductor</code> creates a <code>new THREE.MeshStandardMaterial()</code> 
              instance, loads all specified texture maps (using <code>TextureLoader</code>), and then applies them to the 
              corresponding properties of the material.
            </p>

            <p>
              <strong>Director's Practice:</strong> In <code>master-plan.json</code>, you can influence these parameters 
              through <code>style_hints</code>, such as: "Make the artery walls look wetter and more glossy." The AI will 
              translate this into a lower <code>roughness</code> value.
            </p>

            <h4>Other Common Materials:</h4>
            <ul>
              <li><strong><code>MeshBasicMaterial</code></strong>: Unaffected by lighting, often used for UI elements or "glow" effects.</li>
              <li><strong><code>MeshLambertMaterial</code></strong>: A simple, computationally inexpensive lighting model, suitable for performance-critical scenes.</li>
              <li><strong><code>MeshPhongMaterial</code></strong>: Includes specular highlights, capable of creating shiny plastic or metal surfaces.</li>
              <li><strong><code>PointsMaterial</code></strong>: Used for <code>THREE.Points</code> (particle systems), controlling the size and color of each particle.</li>
              <li><strong><code>ShaderMaterial</code></strong>: The ultimate weapon. Allows you to write custom Vertex and Fragment Shaders to achieve any visual effect you can imagine. The AI can generate GLSL shader code for specific effects (like energy shields, or the flowing effect of a cell membrane) and embed it into the JSON.</li>
            </ul>

            <h3>3.4 Lighting: Without Light, There Is No World</h3>
            
            <p>
              Lighting is the soul of a 3D scene. The Architect must act as a professional lighting designer, setting up 
              a lighting environment that is both physically realistic and artistically beautiful.
            </p>

            <div className="lighting-types">
              <div className="light-type">
                <h4>Ambient Light:</h4>
                <p>
                  Provides a base, non-directional light to the entire scene, preventing the dark parts of objects from 
                  becoming completely black.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`"ambient-light": {
  "type": "AmbientLight",
  "color": "#404040",
  "intensity": 0.5
}`}</code></pre>
                  <p><strong>Conductor's Execution:</strong> <code>new THREE.AmbientLight(0x404040, 0.5)</code></p>
                </div>
              </div>

              <div className="light-type">
                <h4>Directional Light:</h4>
                <p>
                  Simulates a light source at an infinite distance, like the sun. Its rays are parallel and can produce 
                  sharp shadows. The top choice for the scene's Key Light.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`"key-light": {
  "type": "DirectionalLight",
  "color": "#FFFFFF",
  "intensity": 1.0,
  "position": [50, 80, 30], // Position determines the light's direction (from this position towards the origin)
  "castShadow": true, // Does this light cast shadows?
  "shadow": { // Parameters for the shadow map
    "mapSize": [2048, 2048],
    "camera": { "near": 0.5, "far": 500, "left": -50, "right": 50, "top": 50, "bottom": -50 }
  }
}`}</code></pre>
                </div>
              </div>

              <div className="light-type">
                <h4>Point Light:</h4>
                <p>
                  Emits light in all directions from a single point, like a light bulb. Intensity decays with distance.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`"atp-glow": {
  "type": "PointLight",
  "color": "#FFFF00",
  "intensity": 2.0,
  "distance": 50, // The maximum distance the light affects
  "decay": 2, // The rate of decay
  "position": [ ... ]
}`}</code></pre>
                </div>
              </div>

              <div className="light-type">
                <h4>Spot Light:</h4>
                <p>
                  Has a cone-shaped light volume, like a flashlight or a stage spotlight. Can precisely illuminate a part 
                  of the scene, creating dramatic effects.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`"focus-light": {
  "type": "SpotLight",
  "position": [ ... ],
  "target": "mitochondrion-mesh", // The ID of the object the light points at
  "angle": 0.52, // The cone's angle (in radians)
  "penumbra": 0.2, // The blurriness of the cone's edge
  "castShadow": true
}`}</code></pre>
                </div>
              </div>

              <div className="light-type">
                <h4>Hemisphere Light:</h4>
                <p>
                  Simulates natural light from the sky (<code>skyColor</code>) and reflected from the ground 
                  (<code>groundColor</code>), perfect for outdoor scenes.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`"outdoor-light": {
  "type": "HemisphereLight",
  "skyColor": "#87CEEB",
  "groundColor": "#B97A57",
  "intensity": 0.8
}`}</code></pre>
                </div>
              </div>

              <div className="light-type">
                <h4>Image-Based Lighting (IBL):</h4>
                <p>
                  The ultimate technique for realism. Uses a High Dynamic Range (HDR) environment map to provide incredibly 
                  rich and natural lighting and reflections for the scene.
                </p>
                <div className="code-example">
                  <strong>JSON Description:</strong>
                  <pre><code>{`// At the top level of scene.json
"environment": "textures/studio_environment.hdr"`}</code></pre>
                  <p>
                    <strong>Conductor's Execution:</strong> Uses <code>THREE.RGBELoader</code> to load the HDR file, 
                    then sets <code>scene.environment = loadedTexture;</code>. This map will affect the lighting and 
                    reflections of all objects using <code>MeshStandardMaterial</code>.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong>Director's Practice:</strong> In <code>master-plan.json</code>, you can provide high-level lighting 
              guidance, such as: "I need bright, even illumination, like an operating room's shadowless lamp," or "Give me 
              a warm feeling of dusk, with light slanting in from the side." The Architect will intelligently combine the 
              light types above to create the atmosphere you desire.
            </p>
          </section>

          <section className="chapter-outline">
            <h2>Remaining Chapters (Detailed Structure)</h2>
            
            <div className="chapter-preview">
              <h3>Chapter 4: The Rhythm of Time — <code>animation.json</code> and Cinematic Storytelling</h3>
              <p>
                This chapter explores how to breathe life into the static world. We will move beyond simple position tweens 
                and learn how to direct <strong>The Choreographer</strong> to create complex, cinematic dynamic narratives.
              </p>
              <ul>
                <li><strong>4.1 The Animation Timeline Revisited:</strong> Multiple sequences and non-linear narratives</li>
                <li><strong>4.2 A Deep Dive into Tween Types:</strong> Property, Path, Skeletal, and Morph Target animations</li>
                <li><strong>4.3 Cinematography:</strong> Camera animation and cinematic techniques</li>
              </ul>
            </div>

            <div className="chapter-preview">
              <h3>Chapter 5: Law and Order — <code>physics.json</code> and Reality Simulation</h3>
              <p>
                This chapter introduces a brand-new dimension: physics. We will learn how to direct <strong>The Newton</strong> 
                to grant our scene weight, inertia, and realistic collision feedback.
              </p>
              <ul>
                <li><strong>5.1 The Duality of the Visual and Physical Worlds:</strong> Three.js vs Physics Engine</li>
                <li><strong>5.2 Defining a Rigid Body:</strong> Static, Kinematic, and Dynamic bodies</li>
                <li><strong>5.3 Joints:</strong> The invisible chains that connect everything</li>
              </ul>
            </div>

            <div className="chapter-preview">
              <h3>Chapter 6: A Dialogue of Souls — <code>interaction.json</code> and Deep Interactivity</h3>
              <p>
                In this chapter, we will explore how to make the user a participant in the world, not just an observer.
              </p>
              <ul>
                <li><strong>6.1 Event-Driven Architecture:</strong> onClick, onHover, onDrag events</li>
                <li><strong>6.2 Actions:</strong> Answering the world's call with play_animation, toggle_visibility, etc.</li>
                <li><strong>6.3 State Machines:</strong> Giving objects a "personality"</li>
              </ul>
            </div>

            <div className="chapter-preview">
              <h3>Chapter 7: The Full Dress Rehearsal — A Complete Walkthrough</h3>
              <p>
                This chapter integrates all knowledge learned, walking through the entire lifecycle of "The Intelligent 
                Nutritional Meal Plate" project—a complex example featuring interactive physics simulation, real-time 
                data visualization, and deep user engagement.
              </p>
              <ul>
                <li>Project goal and master-plan.json creation</li>
                <li>Multi-agent workflow execution</li>
                <li>Physics-based food interaction</li>
                <li>Real-time nutritional calculation and visualization</li>
              </ul>
            </div>
          </section>

          <section className="conclusion">
            <h2>Conclusion: You Are the Creator of the Next Singularity</h2>
            
            <p>
              We have walked a long and profound journey. From the abstract philosophy of creation to the minute control 
              of every lighting parameter in <code>scene.json</code>; from the cinematic storytelling of <code>animation.json</code> 
              to the solid laws of the world endowed by <code>physics.json</code>; and finally, to the resonance between 
              the user's and the world's souls in <code>interaction.json</code>.
            </p>

            <p>
              What you now possess goes far beyond the usage of a software framework. You have mastered a completely new 
              ideological system for world-building. You understand how to decompose the most complex intents into professional, 
              independent tasks that an AI can understand and execute; you understand how to use declarative "blueprints" 
              to precisely define and constrain a digital universe; and you understand how the immense power of Three.js 
              is fully unleashed in our system as the final, faithful enforcer of reality.
            </p>

            <p>
              The journey of PixelMind Explainer has just begun. In the future, WebXR support will allow the worlds you 
              build to descend into the user's physical space.
            </p>

            <div className="call-to-action">
              <p>
                <strong>Begin your journey of creation today. The universe awaits your command.</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 