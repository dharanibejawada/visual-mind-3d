import { LessonService } from '../src/services/lessonService.js';

async function runVerification() {
  console.log('====================================================');
  console.log('VisualMind 3D — Universal 3D Verification Test Suite');
  console.log('====================================================\n');

  const lessonService = new LessonService();

  const testTopics = [
    { name: 'Human heart', expectedCategory: 'biological' },
    { name: 'Solar system', expectedCategory: 'astronomical' },
    { name: 'Water cycle', expectedCategory: 'environmental_terrain' },
    { name: "Pythagoras' theorem", expectedCategory: 'geometric_math' },
    { name: 'Binary search tree', expectedCategory: 'computer_science' },
    { name: 'Car engine', expectedCategory: 'mechanical' },
    { name: 'French Revolution', expectedCategory: 'historical_spatial' },
    { name: 'Supply and demand', expectedCategory: 'economic_system' },
    { name: 'Plate tectonics and volcanoes', expectedCategory: 'conceptual_system' }, // Arbitrary topic
  ];

  let passedCount = 0;

  for (const t of testTopics) {
    console.log(`\nTesting Topic: "${t.name}"...`);
    try {
      const lesson = await lessonService.createLessonFromTopic(t.name);

      console.log(`  ✓ Title: "${lesson.title}"`);
      console.log(`  ✓ Subject: "${lesson.subject}"`);
      console.log(`  ✓ Template ID: "${lesson.visualization.templateId}"`);

      // Verify no generic fallback text
      const elementsText = JSON.stringify(lesson.visualization.interactiveElements);
      const isGenericDefault = elementsText.includes('Primary Core Unit') || elementsText.includes('Secondary Boundary');
      if (isGenericDefault) {
        throw new Error(`FAIL: Topic returned generic placeholder labels ("Primary Core Unit")!`);
      }

      // Verify not hardcoded snake
      if (lesson.visualization.templateId === 'snake' && !t.name.toLowerCase().includes('snake')) {
        throw new Error(`FAIL: Topic incorrectly defaulted to snake!`);
      }

      // Verify 3D Scene or bespoke 3D visualization
      const hasScene = Boolean(lesson.visualization.scene && lesson.visualization.scene.objects.length > 0);
      const isBespoke3D = ['human-heart', 'solar-system', 'dna', 'atom', 'black-hole', 'snake'].includes(lesson.visualization.templateId);

      if (!hasScene && !isBespoke3D) {
        throw new Error(`FAIL: Neither Universal 3D scene nor bespoke 3D template generated!`);
      }

      if (hasScene) {
        const scene = lesson.visualization.scene!;
        console.log(`  ✓ 3D Scene Category: "${scene.category}"`);
        console.log(`  ✓ 3D Objects Count: ${scene.objects.length}`);
        console.log(`  ✓ Sample 3D Objects: ${scene.objects.slice(0, 3).map(o => `${o.name} (${o.geometry})`).join(', ')}`);
        console.log(`  ✓ 3D Connections Count: ${scene.connections?.length || 0}`);
      } else {
        console.log(`  ✓ Bespoke 3D Interactive Template: "${lesson.visualization.templateId}"`);
      }

      console.log(`  ✓ Learning Objectives: ${lesson.learningObjectives.length}`);
      console.log(`  ✓ Quiz Questions: ${lesson.quiz.length}`);
      console.log(`  ✓ Status: PASSED`);
      passedCount++;
    } catch (err: any) {
      console.error(`  ✗ FAILED:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log(`Verification Complete: ${passedCount}/${testTopics.length} Tests Passed!`);
  console.log('====================================================');

  if (passedCount !== testTopics.length) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
